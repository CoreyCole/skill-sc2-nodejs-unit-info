var gulp = require('gulp')
var gnf = require('gulp-npm-files')
var mocha = require('gulp-mocha')
var argv = require('yargs').argv
var Converter = require('csvtojson').Converter
var jsonfile = require('jsonfile')

// import gulp tasks
var requireDir = require('require-dir')
requireDir('./gulp-tasks')

gulp.task('copyNodeModules', function () {
  gulp.src(gnf(), { base: './' }).pipe(gulp.dest('./dist'))
})

gulp.task('mocha', ['tslint', 'tsc', 'copyNodeModules'], function () {
  return gulp.src('test/**/**.js', { read: false })
    .pipe(mocha({ reporter: 'nyan' }))
})

gulp.task('default', ['tslint', 'tsc', 'copyNodeModules', 'mocha'])

/*
gulp parse-data --csv unit-data/unit-data-3.3.2.csv
*/
gulp.task('parse-data', function () {
  var converter = new Converter({
    headers: [
      'unit',
      'race',
      'supply',
      'minerals',
      'gas',
      'buildTime',
      'size',
      'cargo',
      'armor',
      'armorUpgradeAmount',
      'hitpoints',
      'shieldHitpoints',
      'attributes',
      'groundDamage',
      'groupUpgradeAmount',
      'airDamage',
      'airUpgradeAmount',
      'bonusDamage',
      'bonusUpgradeAmount',
      'groundDps',
      'groundDpsUpgradeAmount',
      'airDps',
      'airDpsUpgradeAmount',
      'bonusDps',
      'bonusDpsUpgradeAmount',
      'attackMods',
      'attackCooldown',
      'movementSpeed',
      'movementSpeedUpgradeAmount',
      'creepSpeedBonusAmount',
      'range',
      'rangeUpgradeAmount',
      'sight'
    ]
  })
  converter.fromFile(argv.csv, function (err, result) {
    if (err) {
      console.error(err)
    }
    var unitMap = {}
    result.forEach(unit => {
      unitMap[unit.unit.toLowerCase()] = unit
    })
    jsonfile.writeFile('src/data/unit-data.json', unitMap, function (err) {
      if (err) {
        console.error(err)
      }
    })
    jsonfile.writeFile('dist/data/unit-data.json', unitMap, function (err) {
      if (err) {
        console.error(err)
      }
    })
  })
})
