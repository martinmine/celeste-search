const { src, dest, parallel } = require("gulp")
const spritesmith = require("gulp.spritesmith")

function toRoundedPercent(value) {
  return (value * 100)
    .toFixed(6)
    .replace(/0+$/, "")
    .replace(/\.$/, "")
    .replace(/(.*)/, "$1%")
    .replace(/^0%$/, "0")
}

/**
 * Generates the CSS for a sprite.
 */
const cssTemplate = name => data => {
  const sharedClass = [
    `.icon--${name} {`,
    `  display: block;`,
    `  background-image: url("/assets/sprites/${name}.png");`,
    `  background-repeat: no-repeat;`,
    `  background-position: -100% -100%;`,
    `  background-size: 100%;`,
    `  max-width: 100%;`,
    `  overflow: hidden;`,
    `}`,
  ].join("\n")

  data.sprites.sort((a, b) => {
    if (a.offset_x !== b.offset_x) {
      return b.offset_x - a.offset_x
    }
    return b.offset_y - a.offset_y
  })

  const iconSelectorLength
    = 10
    + name.length
    + Math.max(...data.sprites.map(s => s.name.length))

  const iconClasses = data.sprites.map(entry => {
    const { y, height, total_height } = entry
    const percentY = toRoundedPercent(y / (total_height - height))

    return [
      `.icon--${name}--${entry.name}`.padEnd(iconSelectorLength) + "{",
      `  background-position: 0 ${percentY};`.trim(),
      `}`,
    ].join(" ")
  }).join("\n")

  return [
    sharedClass,
    iconClasses,
  ].join("\n") + "\n"
}

/**
 * Generates a single sprite.
 */
const sprite = name => () => src(
  `generated/sprites/${name}/*.png`, { base: "generated" })
  .pipe(spritesmith({
    imgName: `${name}.png`,
    cssName: `${name}.scss`,
    cssTemplate: cssTemplate(name),
    algorithm: "top-down",
  }))
  .pipe(dest("generated/sprites"))

/**
 * `gulp sprites`
 */
module.exports = parallel(
  sprite("items"),
  sprite("materials"),
)
