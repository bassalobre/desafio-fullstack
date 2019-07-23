<?php

namespace App\Http\Controllers;

use App\Models\Address;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = User::with('address')->get();

        return response()->json($data);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $user = new User();
        $user->password = Hash::make('password');

        return $this->saveUser($user, $request);
    }

    /**
     * Display the specified resource.
     *
     * @param  User  $user
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        $user->load('address');

        return response()->json($user, $user->wasRecentlyCreated ? 201 : 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  User  $user
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $user)
    {
        return $this->saveUser($user, $request);
    }

    private function saveUser(User $user, Request $request)
    {
        $addressData = $request->get('address');
        $address = Address::where('cep', $addressData['cep'])->first();

        if (!$address) {
            $address = $this->saveAddress(new Address(), $addressData);
        }

        $user->name = $request->get('name');
        $user->email = $request->get('email');
        $user->birthDate = $request->get('birthDate');
        $user->mother_name = $request->get('mother_name');
        $user->father_name = $request->get('father_name');
        $user->address_id = $address->id;
        $user->save();

        return $this->show($user);
    }

    private function saveAddress(Address $address, array $data) : Address
    {
        $address->cep = $data['cep'];
        $address->city = $data['city'];
        $address->state = $data['state'];
        $address->neighborhood = $data['neighborhood'];
        $address->street = $data['street'];
        $address->number = $data['number'];
        $address->comp = $data['comp'];
        $address->save();

        return $address;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  User  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        $user->delete();

        return response()->json(null, 204);
    }
}
