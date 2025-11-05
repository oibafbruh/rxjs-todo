import { Component ,Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { SettingsComponent } from '../settings/settings.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatSelectModule,
    CommonModule,
    MatDialogModule
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  @Input() isMobile: boolean | null = false;
  @Output() menuToggle = new EventEmitter<void>();

  private dialog = inject(MatDialog);

  openSettingsDialog(): void {
    this.dialog.open(SettingsComponent, {
      width: "450px",
      height: "325px"
    });
  }

  onMenuToggle(): void {
    this.menuToggle.emit();
  }

}
