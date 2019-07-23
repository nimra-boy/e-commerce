<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Order;
use App\Carts;
use App\Providers;
use App\Shipping;
use Stripe\Stripe;
use Stripe\Charge;
use Paypal\Api\Payment;


class OrderController extends Controller
{
    /**
    * Store a newly created resource in storage.
    *
    * @param  \Illuminate\Http\Request  $request
    * @return \Illuminate\Http\Response
    */
    public function storeOrder(Request $request)
    {

        error_log($request);

        $ok = $request->get('name');
        $user_id = $request->get('user_id');

        // error_log("id: ".$user_id);

        Stripe::setApiKey('sk_test_4ZMzDdYKMsHYdXUVXJPXLpl5004q2Duwff'); 
        try{
            $i = Charge::create(array(
                "amount" => $request->get('total') * 100,
                "currency" => "eur",
                "source" => $request->get('token')
            ));
            // return $i['succed'];

        }catch(\Exception $e){  
            return $e->getMessage();
        }

        \Stripe\Stripe::setApiKey('sk_test_4ZMzDdYKMsHYdXUVXJPXLpl5004q2Duwff');

        \Stripe\InvoiceItem::create([
            'amount' => 1000,
            'currency' => 'eur',
            'customer' => $request->get('email'),
            'description' => 'One-time setup fee',
        ]);

        \Stripe\Stripe::setApiKey('sk_test_4ZMzDdYKMsHYdXUVXJPXLpl5004q2Duwff');

        $invoice = \Stripe\Invoice::create([
            'customer' => $request->get('email'),
            'collection_method' => 'send_invoice',
            'days_until_due' => 30,
        ]);

        \Stripe\Stripe::setApiKey('sk_test_4ZMzDdYKMsHYdXUVXJPXLpl5004q2Duwff');

        $invoice->sendInvoice();
        error_log($invoice);

            // $invoice = \Stripe\Invoice::retrieve('in_18jwqyLlRB0eXbMtrUQ97YBw');
            // $invoice->sendInvoice();

        error_log($i['status']);


        $order = new Order([
            'user_id' => $request->get('user_id'),
            'price' => $request->get('total'),
            'name' => $request->get('name'),
            'city' => $request->get('city'),
            'country' => $request->get('country'),
            'adress' => $request->get('adress'),
            'zip' => $request->get('zip'),
            'price' => $request->get('total'),
            'delivery' => $request->get('delivery')
            ]);

        $order->save();
        // $this->destroy($user_id);

        $cart = Carts::where('id', $user_id);
        $cart->delete();

        return response()->json('Order Added Successfully.');
    }
    public function storeOrderPaypal(Request $request)
    {
        error_log('ok'. $request);   

    //     $apiContext = new \PayPal\Rest\ApiContext(
    //         new \PayPal\Auth\OAuthTokenCredential(
    //             'AUS7pP2z0JQ6vJVwnRcxS8mSkqINMeBa1x6bII3PmgWYi4aQBBScev5Q-O5qmFPQ9QKnc2ivOPcdn4P4',     // ClientID
    //             'ELMSFEe67Yhvhr0eNvIkr4J0sU-VUe0-Y5smbYXbljOTqfqN4Wabuf_eWAOnEM4K_Au9nSYHDcr9c1Er'      // ClientSecret
    //         )
    //     );
    //     $paymentId = $request->get('paymentID');
    //     $payment = Payment::get($paymentId, $apiContext);

    //     $execution = new PaymentExecution();
    //     $execution->setPayerId($request->get('payerID'));

    //     $transaction = new Transaction();
    //     $amount = new Amount();
    //     $details = new Details();

    //     $details->setShipping(2.2)
    //     ->setTax(1.3)
    //     ->setSubtotal(17.50);

    //     $amount->setCurrency('USD');
    //     $amount->setTotal($request->get('total'));
    //     $amount->setDetails($details);
    //     $transaction->setAmount($amount);

    //     $execution->addTransaction($transaction);


        $order = new Order([
            'user_id' => $request->get('user_id'),
            'name' => $request->get('name'),
            'city' => $request->get('city'),
            'country' => $request->get('country'),
            'adress' => $request->get('adress'),
            'zip' => $request->get('zip'),
            'price' => $request->get('total'),
            'delivery' => $request->get('delivery')
            ]);

        $order->save();
        // $this->destroy($user_id);
        
        $user_id = $request->get('user_id');

        $cart = Carts::where('id', $user_id);
        $cart->delete();

        return response()->json('Order Added Successfully.');
    }

    public function getProviders(Request $request)
    {
        // error_log($request);
        $providers = Providers::orderBy('created_at', 'desc')->get();
        return response()->json($providers);
    }
    public function addProvider(Request $request)
    {
        error_log($request);

        $provider = new Providers([
            'name' => $request->get('name'),
            'price' => $request->get('price'),
            'duration' => $request->get('duration'),
            ]);

        $provider->save();

        return response()->json('provider Added Successfully.');
    }




    public function getMyOrder(Request $request)
    {
        error_log($request);

        $user_id = $request->user_id;

        // error_log("id: ". $user_id);


        $order = Order::where('user_id', $user_id)->get();
        error_log($order);
        return response()->json($order);
    }



    public function getOrder(Request $request)
    {
        // error_log($request);
        $order = Order::orderBy('created_at', 'desc')->get();
        return response()->json($order);
    }

    public function deleteProviders(Request $request)
    {

        $id = $request->key;
        // error_log("ss " . $id);

        $provider = Providers::where('id', $id);
        $provider->delete();
        return response()->json('Order Deleted Successfully.');
    }

    public function updatePriceShipping(Request $request, $id)
    {
        error_log($id);
        $shipping = Shipping::find($id);

        $shipping->price = $request->get('shippingPrice');
        $shipping->save();

        return response()->json('Price Updated Successfully.');
    }
}
