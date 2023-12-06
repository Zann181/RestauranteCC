<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;

class OrderController extends Controller
{
    public function index()
    {
        $orders = Order::with(['product', 'table'])->get();
        return response()->json($orders);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'data' => 'required|date',
            'order_confirmation' => 'required|boolean',
            'id_product' => 'required|exists:products,id',
            'units' => 'required|integer|min:1',
            'id_table' => 'required|exists:tables,id',
        ]);

        $order = Order::create($validatedData);
        return response()->json($order, 201);
    }

    public function show($id)
    {
        $order = Order::with(['product', 'table'])->findOrFail($id);
        return response()->json($order);
    }

    public function update(Request $request, $id)
    {
        $order = Order::findOrFail($id);

        $validatedData = $request->validate([
            'data' => 'required|date',
            'order_confirmation' => 'required|boolean',
            'id_product' => 'required|exists:products,id',
            'units' => 'required|integer|min:1',
            'id_table' => 'required|exists:tables,id',
        ]);

        $order->update($validatedData);
        return response()->json($order);
    }

    public function destroy($id)
    {
        $order = Order::findOrFail($id);
        $order->delete();
        return response()->json(null, 204);
    }
}
