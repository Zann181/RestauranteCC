<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Order extends Model
{
    use HasFactory;

    protected $fillable = ['data', 'order_confirmation', 'id_product', 'units', 'id_table'];

    public function product()
    {
        return $this->belongsTo(Product::class, 'id_product');
    }

    public function table()
    {
        return $this->belongsTo(Table::class, 'id_table');
    }
}
