"use client";

import { useEffect, useState } from "react";
import Card from "../components/ui/card";
import CardContent from "../components/ui/cardContent";
import Input from "../components/ui/input";
import Label from "../components/ui/label";
import Button from "../components/ui/button";
import data from "../data/hiring_cards_data.json";

export default function HiringCardList() {
  const [cardsData, setCardsData] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [monthFilter, setMonthFilter] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const [newCard, setNewCard] = useState({
    cardNumber: "",
    customerName: "",
    machineryName: "",
    location: "",
    status: "Running",
    returnDate: "",
    invoice: "",
    date: "",
  });

  const [columnsShown, setColumnsShown] = useState({
    cardNumber: true,
    customerName: true,
    machineryName: true,
    location: true,
    status: true,
    invoice: true,
  });

  useEffect(() => {
    setCardsData(data);
  }, []);

  const filtered = cardsData.filter((card) => {
    const searchMatch =
      card.cardNumber.includes(search) ||
      card.customerName.toLowerCase().includes(search.toLowerCase());

    const statusMatch = statusFilter === "" || card.status === statusFilter;

    const monthMatch =
      monthFilter === "" ||
      new Date(card.date).getMonth() + 1 === parseInt(monthFilter);

    return searchMatch && statusMatch && monthMatch;
  });

  const toggleColumn = (col) => {
    setColumnsShown({ ...columnsShown, [col]: !columnsShown[col] });
  };

  const exportToExcel = () => {
    alert("Exporting to Excel (placeholder)");
  };

  const handleNewCardChange = (field, value) => {
    setNewCard((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddCard = () => {
    if (!newCard.customerName || !newCard.machineryName) return;
    setCardsData((prev) => [...prev, newCard]);
    setShowAddForm(false);
    setNewCard({
      cardNumber: (parseInt(cardsData[cardsData.length - 1]?.cardNumber || "100000") + 1).toString(),
      customerName: "",
      machineryName: "",
      location: "",
      status: "Running",
      returnDate: "",
      invoice: "",
      date: "",
    });
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <h1 className="text-3xl font-bold text-purple-700 mb-6">
        Hiring Cards Dashboard
      </h1>

      <div className="flex flex-wrap gap-4 mb-4 items-center">
        <Input
          placeholder="Search by Card # or Customer"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-64"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border rounded px-3 py-2"
        >
          <option value="">All Status</option>
          <option value="Received">Received</option>
          <option value="Cancel">Cancel</option>
          <option value="Running">Running</option>
        </select>
        <select
          value={monthFilter}
          onChange={(e) => setMonthFilter(e.target.value)}
          className="border rounded px-3 py-2"
        >
          <option value="">All Months</option>
          {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
            <option key={m} value={m}>
              {new Date(2025, m - 1).toLocaleString("default", {
                month: "long",
              })}
            </option>
          ))}
        </select>
        <Button onClick={exportToExcel} className="bg-purple-700 text-white">
          Export to Excel
        </Button>
        <Button
          onClick={() => {
            const nextCardNumber = (
              parseInt(cardsData[cardsData.length - 1]?.cardNumber || "100000") + 1
            ).toString();
            setNewCard((prev) => ({ ...prev, cardNumber: nextCardNumber }));
            setShowAddForm(true);
          }}
          className="bg-green-600 text-white"
        >
          + Add Card
        </Button>
      </div>

      <div className="mb-6 flex gap-3 flex-wrap">
        {Object.entries(columnsShown).map(([key, value]) => (
          <label key={key} className="text-sm">
            <input
              type="checkbox"
              checked={value}
              onChange={() => toggleColumn(key)}
              className="mr-1"
            />
            {key.replace(/([A-Z])/g, " $1").toUpperCase()}
          </label>
        ))}
      </div>

      <div className="grid gap-4">
        {filtered.map((card) => (
          <Card
            key={card.cardNumber}
            className={`cursor-pointer border px-4 py-2 rounded-xl hover:shadow-md transition duration-200 ${
              card.status === "Received"
                ? "text-green-700 border-green-300"
                : card.status === "Cancel"
                ? "text-red-600 border-red-300"
                : "text-black border-gray-300"
            }`}
            onClick={() => setSelectedCard(card)}
          >
            <CardContent className="grid grid-cols-2 md:grid-cols-6 gap-4">
              {columnsShown.cardNumber && (
                <div>
                  <Label>Card #</Label>
                  <div>{card.cardNumber}</div>
                </div>
              )}
              {columnsShown.customerName && (
                <div>
                  <Label>Customer</Label>
                  <div>{card.customerName}</div>
                </div>
              )}
              {columnsShown.machineryName && (
                <div>
                  <Label>Machine</Label>
                  <div>{card.machineryName}</div>
                </div>
              )}
              {columnsShown.location && (
                <div>
                  <Label>Location</Label>
                  <div>{card.location}</div>
                </div>
              )}
              {columnsShown.status && (
                <div>
                  <Label>Status</Label>
                  <div>{card.status}</div>
                </div>
              )}
              {columnsShown.invoice && (
                <div>
                  <Label>Invoice</Label>
                  <div>{card.invoice || "Not Invoiced"}</div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pop-up for details */}
      {selectedCard && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-xl">
            <h2 className="text-xl font-semibold mb-4 text-purple-700">
              Card Details - {selectedCard.cardNumber}
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(selectedCard).map(([key, value]) => (
                <div key={key}>
                  <Label className="uppercase text-sm font-bold">
                    {key.replace(/([A-Z])/g, " $1").toUpperCase()}
                  </Label>
                  <div>{value || "-"}</div>
                </div>
              ))}
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <Button
                onClick={() => setSelectedCard(null)}
                className="bg-gray-300 text-black"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Pop-up for adding card */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-xl">
            <h2 className="text-xl font-semibold mb-4 text-purple-700">
              Add New Hiring Card
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(newCard).map(([key, value]) => (
                <div key={key}>
                  <Label className="uppercase text-sm font-bold">
                    {key.replace(/([A-Z])/g, " $1").toUpperCase()}
                  </Label>
                  <Input
                    value={value}
                    onChange={(e) => handleNewCardChange(key, e.target.value)}
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <Button
                onClick={() => setShowAddForm(false)}
                className="bg-gray-300 text-black"
              >
                Cancel
              </Button>
              <Button
                onClick={handleAddCard}
                className="bg-green-600 text-white"
              >
                Add
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
