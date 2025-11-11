
package com.urbanspice.model;

import jakarta.persistence.*;

@Entity
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long paymentId;
//-----RELATIONSHIPS--------------------------------------
// ones payment belongs to one order
@OneToOne
    @JoinColumn(name = "order_id", nullable = false)
private Order order;
// ---------- OTHER FIELDS ----------
    private String paymentMethod;   // e.g. "Pay on Delivery", "Credit Card"
    private String paymentStatus;   // e.g. "Pending", "Completed", "Failed"

    // ---------- CONSTRUCTORS ----------
    public Payment() {}

    public Payment(Order order, String paymentMethod, String paymentStatus) {
        this.order = order;
        this.paymentMethod = paymentMethod;
        this.paymentStatus = paymentStatus;
    }

    // ---------- GETTERS & SETTERS ----------
    public Long getPaymentId() {
        return paymentId;
    }

    public void setPaymentId(Long paymentId) {
        this.paymentId = paymentId;
    }

    public Order getOrder() {
        return order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public String getPaymentStatus() {
        return paymentStatus;
    }

    public void setPaymentStatus(String paymentStatus) {
        this.paymentStatus = paymentStatus;
    }
}
