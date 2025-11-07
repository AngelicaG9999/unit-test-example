const {test, describe, it} = require('node:test');
const assert = require('node:assert');
const {tiMonth, fuelEnergySelector, fuelConsumption, combustionConsumption, electricalConsumption, costElectricalKM, fuelEfficiency} = require("../calculators/environment")
const { dummyDataset } = require("../database/dummyDataset");

const electrical_consumption = electricalConsumption(81.14, 200)
const combustion_consumption = combustionConsumption(electrical_consumption)
const fuel_selector = fuelEnergySelector("Diesel")
const fuel_consuption = fuelConsumption(combustion_consumption, fuel_selector["fuel_energy"])

/*PRUEBAS UNITARIAS*/

/*tiMonth*/

describe("Ti Month", () => {
    it("Calculate tiMonth", () => {
        assert.deepStrictEqual(tiMonth(2.8), 0.0023039138595752906)
    })
});

test('Calculate ipc', () => { 
    assert.strictEqual(tiMonth(2.8), 0.0023039138595752906)
})

/*FuelEnergySelector */
describe("Fuel Energy Selector", () => {
    it("gasoline case", () => {
        assert.deepStrictEqual(fuelEnergySelector("gasoline"),{
            "fuel_price": 16700,
            "fuel_energy": 35.58,
            "emision_factor": 69.25
        })
    })

    it("diesel case", () => {
        assert.deepStrictEqual(fuelEnergySelector("diesel"),{
            "fuel_price": 11795,
            "fuel_energy": 40.7,
            "emision_factor": 74.01
        })
    })
}) 
//FALTA TEST DE FuelEnergySelector

/*ElectricalConsumption*/

describe("Electrical Consumption", () => {
    it("Calculate electricalConsumption", () => {
         assert.deestrictEqual(electricalConsumption(81.14, 200), 0.4507777777777778);
    })
});

test('Calculate Electrical Consumption', () => { 
    assert.strictEqual(electricalConsumption(81.14, 200), 0.4507777777777778)
});


/*costElectricalKM*/

describe("Cost Electrical km", () => {
    it("Calculate Cost electrical KM", () => {
        assert.StrictEqual(costElectricalKM(electrical_consumption, 650), 292.5)
    })
});

test('Calculate Cost Electrical km', () => { 
    assert.strictEqual(costElectricalKM(electrical_consumption, 650), 292.5)
});

/*CombustionConsumption*/

describe("Combustion Consumption", () => {
    it("Calculate Combustion Consumption", () => {
        assert.StrictEqual(combustionConsumption(electrical_consumption), 1.6666666666666667)
    })
});

test('Calculate Combustion Consumption', () => { 
    assert.strictEqualcombustionConsumption(electrical_consumption, 1.6666666666666667)
});

/*fuelConsumption*/
describe("Fuel Consumption", () => {
    it("Calculate Fuel Consumption", () => {
        assert.strictEqual(fuelConsumption(1.6, 40.7), 0.04102081879859657)
    })
});

test("fuelConsuption Test", () => {
    assert.strictEqual(fuelConsumption(combustion_consumption, fuel_selector["fuel_energy"]), 0.04102081879859657)
});

/*fuelEfficiency*/

describe("Fuel Efficiency", () => {
    it("Calculate Fuel Efficiency", () => {
        assert.strictEqual(fuelEfficiency(fuel_consuption), 25)
    })
});

test("Calculate Fuel Efficiency", () => {
    assert.strictEqual(fuelEfficiency(fuel_consuption), 25)
});
