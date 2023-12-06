<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CashRegister;

class CashRegisterController extends Controller
{
    public function index()
    {
        $cashRegisters = CashRegister::with('bill')->get();
        return response()->json($cashRegisters);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'base_value' => 'required|numeric',
            'date_day' => 'required|date',
            'id_bill' => 'required|exists:bills,id',
            'total_day' => 'required|numeric',
        ]);

        $cashRegister = CashRegister::create($validatedData);
        return response()->json($cashRegister, 201);
    }

    public function show($id)
    {
        $cashRegister = CashRegister::with('bill')->findOrFail($id);
        return response()->json($cashRegister);
    }

    public function update(Request $request, $id)
    {
        $cashRegister = CashRegister::findOrFail($id);

        $validatedData = $request->validate([
            'base_value' => 'required|numeric',
            'date_day' => 'required|date',
            'id_bill' => 'required|exists:bills,id',
            'total_day' => 'required|numeric',
        ]);

        $cashRegister->update($validatedData);
        return response()->json($cashRegister);
    }

    public function destroy($id)
    {
        $cashRegister = CashRegister::findOrFail($id);
        $cashRegister->delete();
        return response()->json(null, 204);
    }
}
