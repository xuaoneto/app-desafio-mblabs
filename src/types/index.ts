export interface TicketsSold {
  id: number;
  created_at: string;
  user_id: string;
  event_id: number;
}

export interface Event {
  id?: number;
  title: string;
  date: string;
  description: string;
  image: string;
  tickets: number;
  price: number;
  created_by?: string;
}

export interface MenuSubItem {
  name: string;
  onClick: () => void | Promise<void>;
  condition?: boolean;
}
