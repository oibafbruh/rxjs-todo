export interface Todo {
  id: number;
  name: string;
  status: 'Aktiv' | 'Wartet' | 'Abgeschlossen';
  priority: 'Niedrig' | 'Mittel' | 'Hoch';
  tags: string[];
}