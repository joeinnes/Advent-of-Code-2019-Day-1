// Set up: require fs, read in the input, and convert to an array
const fs = require('fs')
const inputFromFile = fs.readFileSync('./input.txt', 'utf-8')
input = inputFromFile.split("\n")

// For part one, from a list of module masses, calculate the fuel required to lift each mass
async function partOne(input) {
  // Create an array of fuel loads required to lift each module
  const fuelPerModule = input.map((moduleMass) => fuelBurn(moduleMass))

  // Reduce the array to get the total fuel load
  const totalFuel = fuelPerModule.reduce((total, current) => {
    return total + current
  })

  console.log(`Part 1:
    Total fuel required: ${totalFuel}`)
}

// Part one calculated the fuel required to lift the core mass, but the additional fuel also has mass.
function partTwo(input) {

  // This array represents the total amount of fuel needed to lift the module **and** its fuel load
  const fuelPerModulePlusFuel = input.map((moduleMass) => calculateFuelRequired(moduleMass))

  // As above, reduce to get total
  const totalFuel2 = fuelPerModulePlusFuel.reduce((total, current) => {
    return total + current
  })
  console.log(`Part 2:
    Total fuel required: ${totalFuel2}`)
}

// Simple abstraction to convert the string input into a number, and run the calculation. Should return an integer.
function fuelBurn(input) {
  return Math.floor(parseInt(input, 10) / 3) - 2
}

// More complex calculation required to find out how much fuel is needed
function calculateFuelRequired(mass) {
  // Get the amount of fuel needed to lift the module
  let initialFuel = fuelBurn(mass)
  let fuelForFuel = 0
  let fuelAccumulator = initialFuel
  // Calculate the fuel load required to lift the fuel. While it's more than 0, more fuel needs to be added, so loop needs to re-run with the new fuel.
  while (fuelBurn(fuelAccumulator) > 0) {
    // The 'accumulator' is how much additional fuel needs to be burned to lift the currently tracked 'new' amount of fuel
    fuelAccumulator = fuelBurn(fuelAccumulator)
    // This is tracking the total amount of fuel needed to lift the fuel for this module
    fuelForFuel += fuelAccumulator
  }

  // The initialFuel is the fuel required to lift the module, the fuelForFuel is the fuel required to lift the fuel
  return fuelForFuel + initialFuel
}

partOne(input)
partTwo(input)

