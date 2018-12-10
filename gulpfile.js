const gulp = require("gulp")
const rename = require("gulp-rename")
const spritesmith = require("gulp.spritesmith")
const tinify = require("gulp-tinify")

const sprite = name =>
  () => gulp.src(`generated/sprites-input/${name}/*.png`)
    .pipe(spritesmith({
      imgName: `${name}.png`,
      cssName: `${name}.css`,
      cssTemplate: data => {
        const sharedClass = [
          `.icon--${name} {`,
          `  display: block;`,
          `  background-image: url("assets/generated/sprite-${name}.min.png");`,
          `  width: 20px;`,
          `  height: 20px;`,
          `}`,
        ].join("\n")

        const iconSelectorLength
          = name.length + `${data.sprites.length}`.length + 10

        const iconClasses = data.sprites.map(entry => [
          `.icon--${name}--${entry.name}`.padEnd(iconSelectorLength) + "{",
          `  background-position: ${entry.offset_x}px ${entry.offset_y}px;`.trim(),
          `}`,
        ].join(" ")).join("\n")

        return [
          sharedClass,
          iconClasses,
        ].join("\n")
      },
    }))
    .pipe(gulp.dest("generated/sprites"))

const sprites = gulp.parallel(
  sprite("items"),
  sprite("materials"),
)

const optimize = () => gulp.src([`generated/sprites/*?!(min).png`])
  .pipe(tinify(process.env.TINIFY_API_KEY))
  .pipe(rename(path => {
    path.extname = ".min" + path.extname
  }))
  .pipe(gulp.dest("generated/sprites"))
  .pipe(gulp.dest("src/assets/generated"))

exports.sprites = sprites
exports.optimize = optimize
