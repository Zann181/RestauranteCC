<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Chef;

class ChefController extends Controller
{
    public function index()
    {
        $chefs = Chef::all();
        return response()->json($chefs);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'date' => 'required|date',
        ]);

        $chef = Chef::create($validatedData);
        return response()->json($chef, 201);
    }

    public function show($id)
    {
        $chef = Chef::findOrFail($id);
        return response()->json($chef);
    }

    public function update(Request $request, $id)
    {
        $chef = Chef::findOrFail($id);

        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'date' => 'required|date',
        ]);

        $chef->update($validatedData);
        return response()->json($chef);
    }

    public function destroy($id)
    {
        $chef = Chef::findOrFail($id);
        $chef->delete();
        return response()->json(null, 204);
    }
}
