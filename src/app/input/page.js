import { BillObject } from "../objects/bill-object";
import { BillInput } from "./bill-input";

export const metadata = {
    title: 'Input',
    description: 'Input spending data',
}

export default function Input() {
    return (<BillInput />);
}