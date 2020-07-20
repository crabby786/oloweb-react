import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { IrestData, IOrderStatus } from '../../Models/RestListModel';
import { RestHeader } from './rest_detail_header';
import { d_OrderStatus } from '../../Constants/dummy';


class OrderStatusPage extends Component<any, any> {
    readonly restData: IrestData = this.props.restData;
    readonly orderStatus:IOrderStatus = this.restData.orderStatus[0];
    // readonly orderStatus: IOrderStatus = d_OrderStatus[0];

    state = {
    }
    render() {
        const restObj = this.restData.homeDetails.RestaurantList[0].RestaurantDeliveryList.find(obj => obj.RestaurantId === this.orderStatus.RestaurantId);
        const orderStatus = this.orderStatus;
        return (
            <div className="container order-status"  >
                <div className="row border-bottom">
                    <RestHeader selectedRest={restObj}></RestHeader>
                </div>
                <div className="row ">
                    <div className="col-12">
                        <h3 className="text-center p-2 my-2 mb-md-4 ">
                            Order Summary
                        </h3>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="right-order-dt bill-section mb-4">
                            <div className="order-no"> Bill No. : {orderStatus.BillNo} </div>
                            {
                                orderStatus.DeliveryAddress &&
                                <>
                                    <h3 className="mt-4 "> Delivery Address </h3>
                            <p> {orderStatus.DeliveryAddress} </p>
                                </>
                            }
                            <div className="payment-method-dt">
                                <div className="attr-r"> {orderStatus.OrderStatus}
                                </div>
                                <div className="attr-l">Delivery Status</div>
                            </div>
                            <div className="payment-method-dt">
                                <div className={orderStatus.OrderType === "Delivered" ? "text-success attr-r" : "attr-r"}>
                                    {orderStatus.OrderType}
                                </div>
                                <div className="attr-l">Payment Method</div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="right-order-dt bill-section">
                            <div className="your-order ">
                                <h3 className="title mb-2 ">Bill Details</h3>
                                <table id="bill-table" className="table table-borderless">
                                    <thead>
                                        <tr>
                                            <th>Menu</th>
                                            <th>Qty</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orderStatus.PropPubMenuItemList.map((item, i) => {
                                            return (
                                                <tr key={i} >
                                                    <td> {item.PropPubMenuItemDescription} </td>
                                                    <td> {item.Quantity} </td>
                                                    <td>
                                                        <span className="rupee">
                                                            {Number(item.PropPubRate) * Number(item.Quantity)}
                                                        </span>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                        }
                                    </tbody>
                                </table>
                                <table className="table" id="tax-table">
                                    <tbody>
                                        <tr className="bg-light">
                                            <th><h4> Sub Total </h4></th>
                                            <th>
                                                <h4><span className="rupee"> {Number(orderStatus.TotalAmount).toFixed(2)} </span></h4>
                                            </th>
                                        </tr>
                                        {orderStatus.PropPubTaxList.length && orderStatus.PropPubTaxList.map((tax, i) => (
                                            <tr key={i} >
                                                <td className=""> {tax.TaxDescription}
                                                </td>
                                                <td className=""> <span className="rupee">{Number(tax.TaxAmount).toFixed(2)} </span>
                                                </td>
                                            </tr>
                                        ))}
                                        <tr className="bg-light">
                                            <td className="" >
                                                <h4>Grand Total</h4> </td>
                                            <td>
                                                <h4> <span className="rupee">{Number(orderStatus.GrandTotal).toFixed(2)} </span> </h4>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        restData: state.restListReducer,
    };
};
const mapDispatchToProps = () => {
    return {
    }
}


export default compose<any, any>(
    connect(mapStateToProps, mapDispatchToProps),
)(OrderStatusPage);
