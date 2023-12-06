<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Bill;

class BillController extends Controller
{
    public function index()
    {
        $bills = Bill::with('waiter')->get();
        return response()->json($bills);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'date' => 'required|date',
            'id_waiter' => 'required|exists:waiters,id',
            'amount' => 'required|numeric',
            'price_unit' => 'required|numeric',
        ]);

        $bill = Bill::create($validatedData);
        return response()->json($bill, 201);
    }

    public function show($id)
    {
        $bill = Bill::with('waiter')->findOrFail($id);
        return response()->json($bill);
    }

    public function update(Request $request, $id)
    {
        $bill = Bill::findOrFail($id);

        $validatedData = $request->validate([
            'date' => 'required|date',
            'id_waiter' => 'required|exists:waiters,id',
            'amount' => 'required|numeric',
            'price_unit' => 'required|numeric',
        ]);

        $bill->update($validatedData);
        return response()->json($bill);
    }

    public function destroy($id)
    {
        $bill = Bill::findOrFail($id);
        $bill->delete();
        return response()->json(null, 204);
    }
}
