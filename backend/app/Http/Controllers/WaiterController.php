<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Waiter;

class WaiterController extends Controller
{
    public function index()
    {
        $waiters = Waiter::with(['order', 'table'])->get();
        return response()->json($waiters);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'date' => 'required|date',
            'id_order' => 'required|exists:orders,id',
            'sold_day' => 'required|numeric',
            'id_table' => 'required|exists:tables,id',
        ]);

        $waiter = Waiter::create($validatedData);
        return response()->json($waiter, 201);
    }

    public function show($id)
    {
        $waiter = Waiter::with(['order', 'table'])->findOrFail($id);
        return response()->json($waiter);
    }

    public function update(Request $request, $id)
    {
        $waiter = Waiter::findOrFail($id);

        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'date' => 'required|date',
            'id_order' => 'required|exists:orders,id',
            'sold_day' => 'required|numeric',
            'id_table' => 'required|exists:tables,id',
        ]);

        $waiter->update($validatedData);
        return response()->json($waiter);
    }

    public function destroy($id)
    {
        $waiter = Waiter::findOrFail($id);
        $waiter->delete();
        return response()->json(null, 204);
    }
}
