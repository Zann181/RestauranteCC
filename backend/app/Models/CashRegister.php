<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class CashRegister extends Model
{
    use HasFactory;

    protected $fillable = ['base_value', 'date_day', 'id_bill', 'total_day'];

    public function bill()
    {
        return $this->belongsTo(Bill::class, 'id_bill');
    }
}
