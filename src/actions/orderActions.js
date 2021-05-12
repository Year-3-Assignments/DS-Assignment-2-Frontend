import axios from 'axios';
import { GET_ALL_ORDERS, UPDATE_ORDER, DELETE_ORDER, GET_ORDER } from './index';

export function getOrderDetails() {
    return {
        type: GET_ALL_ORDERS,
        payload: axios.get(`${process.env.REACT_APP_API_URL}/api/order/${localStorage.getItem("id")}`, {
            headers: {
                "Authorization": localStorage.getItem("Authorization")
            }
        })
    };
}

export function updateOrderDetail(order) {
    return {
        type: UPDATE_ORDER,
        payload: axios.put(`${process.env.REACT_APP_API_URL}/api/order/update/${order.id}`, order, {
            headers: {
                "Authorization": localStorage.getItem("Authorization")
            }
        })
    };
}

export function deleteOrderDetail(order) {
    return {
        type: DELETE_ORDER,
        payload: axios.delete(`${process.env.REACT_APP_API_URL}/api/order/delete/${order.id}`, {
            headers: {
                "Authorization": localStorage.getItem("Authorization")
            }
        })
    };
}

export function setOrder(order) {
    return {
        type: GET_ORDER,
        payload: order
    };
}