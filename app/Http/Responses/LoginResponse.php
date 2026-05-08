<?php

namespace App\Http\Responses;

use Illuminate\Support\Facades\Auth;
use Laravel\Fortify\Contracts\LoginResponse as LoginResponseContract;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class LoginResponse implements LoginResponseContract
{
    /**
     * Create an HTTP response that represents the object.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function toResponse($request): Response
    {
        $user = Auth::user();

        if ($user->hasRole('super_admin')) {
            return redirect()->intended(route('super-admin.dashboard'));
        }

        if ($user->hasRole('admin')) {
            return redirect()->intended(route('admin.dashboard'));
        }

        if ($user->hasRole('staff_keuangan')) {
            return redirect()->intended(route('staff-keuangan.dashboard'));
        }

        // Default to jamaah or fallback
        return redirect()->intended(route('jamaah.beranda'));
    }
}
