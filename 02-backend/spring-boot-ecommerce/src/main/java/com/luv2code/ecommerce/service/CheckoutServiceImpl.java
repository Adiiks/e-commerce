package com.luv2code.ecommerce.service;

import com.luv2code.ecommerce.dao.CustomerRepository;
import com.luv2code.ecommerce.dto.PaymentInfo;
import com.luv2code.ecommerce.dto.Purchase;
import com.luv2code.ecommerce.dto.PurchaseResponse;
import com.luv2code.ecommerce.entity.Customer;
import com.luv2code.ecommerce.entity.Order;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
public class CheckoutServiceImpl implements CheckoutService {

    private final CustomerRepository customerRepository;

    public CheckoutServiceImpl(CustomerRepository customerRepository,
                               @Value("${stripe.key.secret}") String secretKey) {
        this.customerRepository = customerRepository;

        Stripe.apiKey = secretKey;
    }

    @Override
    @Transactional
    public PurchaseResponse placeOrder(Purchase purchase) {
        Order order = purchase.getOrder();

        order.setOrderTrackingNumber(generateOrderTrackingNumber());

        purchase.getOrderItems().forEach(order::addOrderItem);

        order.setShippingAddress(purchase.getShippingAddress());
        order.setBillingAddress(purchase.getBillingAddress());

        Customer customer = purchase.getCustomer();

        Customer customerFromDb = customerRepository.findByEmail(customer.getEmail());

        if (customerFromDb != null) {
            customer = customerFromDb;
        }

        customer.addOrder(order);

        customerRepository.save(customer);

        return new PurchaseResponse(order.getOrderTrackingNumber());
    }

    @Override
    public PaymentIntent createPaymentIntent(PaymentInfo paymentInfo) throws StripeException {
        List<String> paymentMethodTypes = new ArrayList<>(List.of("card"));

        Map<String, Object> params = new HashMap<>();
        params.put("amount", paymentInfo.getAmount());
        params.put("currency", paymentInfo.getCurrency());
        params.put("payment_method_types", paymentMethodTypes);
        params.put("description", "Luv2Shop purchase");
        params.put("receipt_email", paymentInfo.getReceiptEmail());

        return PaymentIntent.create(params);
    }

    private String generateOrderTrackingNumber() {
        return UUID.randomUUID().toString();
    }
}
