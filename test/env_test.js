const assert = require('assert');
const {tiMonth, fuelEnergySelector, fuelConsumption, 
        combustionConsumption, electricalConsumption, costElectricalKM, 
        fuelEfficiency, fuelCostKm, energyKm, emisionKm, avoidedEmissions, 
        monthlySavings, annualSavings, youngTree, oldTree, energyH2LowPresure, 
        energyConsumed, hydrogenMass, litersRequired, energyH2Cylinders,
        savedEnergy
    } = require("../calculators/environment")
const { dummyDataset } = require("../database/dummyDataset");
const data = dummyDataset();

const electrical_consumption = electricalConsumption(81.14, 200)
const combustion_consumption = combustionConsumption(electrical_consumption)
const fuel_selector = fuelEnergySelector("Diesel")
const fuel_consuption = fuelConsumption(combustion_consumption, fuel_selector["fuel_energy"])
const energy_km = energyKm(combustion_consumption)
const emisiones_km = emisionKm(1,energy_km)
const fuel_cost_km = fuelCostKm(16700, fuel_consuption)
const cost_electrical_km = costElectricalKM(electrical_consumption, 238.25)
const monthly_savings = monthlySavings(fuel_cost_km, cost_electrical_km, 30000)
const avoided_Emissions = avoidedEmissions(emisiones_km, 30000)
const energy_H2_Cylinders = energyH2Cylinders(81.14)
const energy_H2_LowPresure = energyH2LowPresure(energy_H2_Cylinders)
const hydrogen_Mass = hydrogenMass(energy_H2_LowPresure)

/*PRUEBAS UNITARIAS*/

/*tiMonth*/
describe("Cálculos funciones", () => {
    describe("Ti Month", () => {
        it("Calculate the function tiMonth", () => {
            assert.equal(tiMonth(2.8), 0.0023039138595752906)
        })

        it("Return 0 when IPC = 0", () => {
            assert.strictEqual(tiMonth(0), 0);
        });

        it("Return NaN if the value is not a number", () => {
            assert.ok(isNaN(tiMonth("abc")));
        });

    });


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

    /*ElectricalConsumption*/

    describe("Electrical Consumption", () => {
        it("Calculate the function Electrical Consumption", () => {
            assert.equal(electricalConsumption(81.14, 200), 0.4507777777777778);
        })
    });

    /*costElectricalKM*/

    describe("Cost Electrical km", () => {
        it("Calculate the function Cost electrical KM", () => {
            assert.equal(costElectricalKM(electrical_consumption, 238.25).toFixed(12), 107.397805555556)
        })
    });

    /*CombustionConsumption*/

    describe("Combustion Consumption", () => {
        it("Calculate the function Combustion Consumption", () => {
            assert.equal(combustionConsumption(electrical_consumption).toFixed(14), 1.66954732510288)
        })
    });

    /*fuelConsumption*/
    describe("Fuel Consumption", () => {
        it("Calculate the function Fuel Consumption", () => {
            assert.equal(fuelConsumption(combustion_consumption, 40.7), 0.04102081879859657)
        })
    });


    /*fuelEfficiency*/
    describe("Fuel Efficiency", () => {
        it("Calculate the funcion Fuel Efficiency", () => {
            assert.equal(fuelEfficiency(fuel_consuption).toFixed(14), 24.3778654177964)
        })
    });

      /*fuelCostKm*/
      describe("Fuel Cost Km", () => {
        it("Calculate the function Fuel Cost Km", () => {
            assert.equal(fuelCostKm(16700, fuel_consuption), 685.0476739365628)
         })

         it("should CANCEL this test", function () {
            if (true) {
                    console.log("simulating test cancelation...");
                    this.skip();
                }
                assert.ok(true); 
            });
      })

      /*Energy Km*/
      describe("Energy Km", () => {
        it("Calculate the function Energy Km", () => {
            assert.equal(energyKm(combustion_consumption).toFixed(2), 6010370.37)
         })
      })

      /*Emision Km*/
      describe("Emision Km", () => {
        it("Calculate the function Emision Km with emision factor gasoline", () => {
            assert.equal(emisionKm(energy_km, data.emision_factor_gasoline).toFixed(2), 416.22)
         })

         it("Calculate the function Emision Km with emision factor diesel", () => {
            assert.equal(emisionKm(energy_km, data.emision_factor_diesel).toFixed(2), 444.83)
         })
      })

      /*Saved Energy*/
        describe("Saved Energy", () => {
        it("Calculate the function Saved Energy", () => {
            assert.equal(savedEnergy(combustion_consumption, electrical_consumption,30000).toFixed(10), 36353.0864197530)
         })
      })

      /*Avoided Emissions*/
        describe("Avoided Emissions", () => {
        it("Calculate the function Avoided Emissions", () => {
            assert.equal(avoidedEmissions(emisiones_km,30000).toFixed(15), 0.180311111111111 )
         })

         it.skip("SKIPPED Calculate the function Avoided Emissions", () => {
            assert.equal(avoidedEmissions(emisiones_km,30000).toFixed(15), 0.180311111111111 )
         })
      })

      /*Monthly Savings*/
        describe("Monthly Savings", () => {
        it("Calculate the function Monthly Savings", () => {
            assert.equal(monthlySavings(fuel_cost_km, cost_electrical_km,30000 ).toFixed(7), 1444124.6709525)
         })
      })

      /*Annual Savings*/
        describe("Annual Savings", () => {
        it("Calculate the function Annual Savings", () => {
            assert.equal(annualSavings(monthly_savings,1).toFixed(5), 5913690527.55056)
         })

      })

      /*Young Tree*/
        describe("Fuel Cost Km", () => {
        it("Calculate the function Young Tree", () => {
            assert.equal(youngTree(avoided_Emissions), 18)
         })
      })

        /*Old Tree*/
        describe("Old Tree", () => {
        it("Calculate the function Old Tree", () => {
            assert.equal(oldTree(avoided_Emissions), 6)
         })
      })

        /*Energy H2 Cylinders*/
        describe("Energy H2 Cylinders", () => {
        it("Calculate the function Energy H2 Cylinders", () => {
            assert.equal(energyH2Cylinders(1), 1.85185185185185)
         })
      })

        /*Energy H2 LowPresure*/
        describe("Energy H2 LowPresure", () => {
        it("Calculate the function Energy H2 LowPresure", () => {
            assert.equal(energyH2LowPresure(energy_H2_Cylinders).toFixed(12), 158.167641325536)
         })
      })

      
        /*Energy Consumed*/
        describe("Energy Consumed", () => {
        it("Calculate the function Energy Consumed", () => {
            assert.equal(energyConsumed(energy_H2_LowPresure).toFixed(10), 208.1153175336)
         })
      })

            
        /*Hydrogen Mass*/
        describe("Hydrogen Mass", () => {
        it("Calculate the function Hydrogen Mass", () => {
            assert.equal(hydrogenMass(energy_H2_LowPresure).toFixed(13), 4.7455037901451)
         })
      })

      /*Liters Required*/
         describe("Liters Required", () => {
        it("Calculate the function Liters Required", () => {
            assert.equal(litersRequired(hydrogen_Mass), 9)
         })
      })
})