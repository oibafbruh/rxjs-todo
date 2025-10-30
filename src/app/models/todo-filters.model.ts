export interface TodoFilters {
    search: string | null;
    status: 'Alle' | 'Aktiv' | 'Wartet' | 'Abgeschlossen';
    priority: 'Alle' | 'Niedrig' | 'Mittel' | 'Hoch';
}
