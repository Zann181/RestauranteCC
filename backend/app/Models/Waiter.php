<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Waiter extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'date', 'id_order', 'sold_day', 'id_table'];

    public function order()
    {
        return $this->belongsTo(Order::class, 'id_order');
    }

    public function table()
    {
        return $this->belongsTo(Table::class, 'id_table');
    }
}
