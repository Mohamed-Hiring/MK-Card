import React from "react";
import Label from "./label";

interface CardProps {
  card: any;
  columnsShown: any;
}

const CardContent: React.FC<CardProps> = ({ card, columnsShown }) => {
  const rate = parseFloat(card["RATE PER 8 HOUR"] || "0");
  const hours = parseFloat(card["TOTAL HOUR"] || "0");
  const invoiced = parseFloat(card["INVOICED AMOUNT"] || "0");

  const hiringAmount = rate && hours ? (rate / 8) * hours : 0;
  const isCorrect = hiringAmount === invoiced;

  return (
    <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
      {columnsShown.cardNumber && (
        <div>
          <Label>Card #</Label>
          <div>{card["CARD NUMBER"]}</div>
        </div>
      )}
      {columnsShown.customerName && (
        <div>
          <Label>Customer</Label>
          <div>{card["CUSTOMER NAME"]}</div>
        </div>
      )}
      {columnsShown.machineryName && (
        <div>
          <Label>Machine</Label>
          <div>{card["HIRING MACHINERY NAME"]}</div>
        </div>
      )}
      {columnsShown.location && (
        <div>
          <Label>Location</Label>
          <div>{card["LOACATION"]}</div>
        </div>
      )}
      {columnsShown.status && (
        <div>
          <Label>Status</Label>
          <div>{card["CARD STATUS"]}</div>
        </div>
      )}
      {columnsShown.invoice && (
        <div>
          <Label>Invoice</Label>
          <div>{card["TAX INVOICE"] || "Not Invoiced"}</div>
        </div>
      )}
      {/* الأعمدة اليديدة */}
      <div>
        <Label>Rate / 8hr</Label>
        <div>{rate || "-"}</div>
      </div>
      <div>
        <Label>Hiring Amount</Label>
        <div>{hiringAmount.toFixed(2)}</div>
      </div>
      <div>
        <Label>Invoiced</Label>
        <div
          className={`font-bold ${
            isCorrect ? "text-green-600" : "text-red-600"
          }`}
        >
          {invoiced || "-"}
        </div>
      </div>
    </div>
  );
};

export default CardContent;
