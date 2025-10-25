const { Router } = require('express');
const response = require('../../network/response')
const router = Router();
const ctrl = require('./index');
const {tiMonth, fuelEnergySelector, electricalConsumption, costElectricalKM, combustionConsumption, fuelConsumption, fuelEfficiency, fuelCostKm, energyKm, emisionKm, monthlySavings, annualSavings, youngTree, oldTree} = require('../../calculators/environment')
const { areaCirculo } = require('../../calculators/calculo1');
const { areaRectangulo } = require('../../calculators/calculo2');


router.get('/env_test/:fuel', async (req, res) => {
    const fuel = req.params.fuel

    const electrical_consumption = electricalConsumption(81.14, 200)
    const combustion_consumption = combustionConsumption(electrical_consumption)
    const fuel_selector = fuelEnergySelector(fuel)
    const fuel_consuption = fuelConsumption(combustion_consumption, fuel_selector["fuel_energy"])
    const energy_km = energyKm(combustion_consumption)
    const emisiones_km = emisionKm(1,energy_km)
    const fuel_cost_km = fuelCostKm(16700, fuel_consuption)
    const cost_electrical_km = costElectricalKM(electrical_consumption, 238.25)
    const monthly_savings = monthlySavings(fuel_cost_km, cost_electrical_km, 30000)
    const avoided_Emissions = avoidedEmissions(emisiones_km, 30000)
    const energy_H2_Cylinders = energyH2Cylinders(1)
    const energy_H2_LowPresure = energyH2LowPresure(energy_H2_Cylinders)
    try {
        const list = {
            "month_inflation": tiMonth(2.8),
            "fuel_selected": fuel_selector,
            "electrical_consuption": electrical_consumption, 
            "cost_electrical_km": cost_electrical_km, 
            "combustion_consuption": combustion_consumption, 
            "fuel_consuption": fuel_consuption,
            "fuel_eficiency": fuelEfficiency(fuel_consuption),
            "fuel_cost_km": fuel_cost_km,
            "energy_Km": energy_km,
            "emision_Km": emisiones_km,
            "saved_Energy": savedEnergy(combustion_consumption, electrical_consumption,30000),
            "avoided_Emissions": avoidedEmissions(emisiones_km, 30000),
            "monthly_Savings": monthlySavings(fuel_cost_km, cost_electrical_km, 30000),
            "annual_Savings": annualSavings(monthly_savings, 1 ),
            "young_Tree": youngTree(avoided_Emissions),
            "old_Tree": oldTree(avoided_Emissions),
            "energy_H2_Cylinders": energyH2Cylinders(1),
            "energy_H2_LowPresure": energyH2LowPresure(energy_H2_Cylinders),
            "energyConsumed": energyConsumed(energy_H2_LowPresure),
            "hydrogenMass": hydrogenMass(energy_H2_LowPresure),
            "litersRequired": litersRequired(1)

        }
        response.success(req, res, list, 200);    
    } catch (error) {
        response.error(req, res, error.message, 500); 
    }
})



module.exports = router ;