export type Udhetim = {
  id: number;
  nisja: string;
  destinacioni: string;
  data: string;
  ora: string;
  vendtakimi: string;
  numriVendeve: number;
  vendetELira: number;
};

export const udhetimet: Udhetim[] = [
  {
    id: 1,
    nisja: "Prishtinë",
    destinacioni: "AAB",
    data: "2026-10-05",
    ora: "08:00",
    vendtakimi: "Stacioni i autobusëve – platforma 3",
    numriVendeve: 4,
    vendetELira: 2,
  },
  {
    id: 2,
    nisja: "Fushë Kosovë",
    destinacioni: "AAB",
    data: "2026-10-05",
    ora: "08:15",
    vendtakimi:
      "VENDTAKIMI: Parku i Qendrës – hyrja kryesore pranë fontanës (stacion Fushë Kosovë)",
    numriVendeve: 4,
    vendetELira: 1,
  },
  {
    id: 3,
    nisja: "Lipjan",
    destinacioni: "AAB",
    data: "2026-10-05",
    ora: "07:45",
    vendtakimi: "Qendra e qytetit – sheshi para bibliotekës",
    numriVendeve: 4,
    vendetELira: 0,
  },
];

export function gjejUdhetimin(id: string): Udhetim | undefined {
  const numId = Number.parseInt(id, 10);
  if (Number.isNaN(numId)) {
    return undefined;
  }
  return udhetimet.find((udhetim) => udhetim.id === numId);
}
