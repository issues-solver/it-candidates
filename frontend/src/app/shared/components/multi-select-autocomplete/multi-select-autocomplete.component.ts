import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-multi-select-autocomplete',
  templateUrl: './multi-select-autocomplete.component.html',
  styleUrls: ['./multi-select-autocomplete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MultiSelectAutocompleteComponent),
    multi: true,
  }],
})
export class MultiSelectAutocompleteComponent implements ControlValueAccessor {
  public selectedOptionsMap: Record<string, boolean> = {};
  public selectedOptions: string[] = [];
  public searchControl = new FormControl('');
  // Value Accessor
  private onChange!: (data: string[]) => void;
  private onTouched!: () => void;

  @Input() options: string[] | null = [];

  constructor(private cdr: ChangeDetectorRef) {}

  public onOptionSelect(option: string) {
    if (this.selectedOptionsMap[option]) {
      delete this.selectedOptionsMap[option];
    } else {
      this.selectedOptionsMap[option] = true;
    }
    // Side effect
    this.selectedOptions = Object.keys(this.selectedOptionsMap);
    this.onChange(this.selectedOptions);
  }

  public resetSelectedOptions = () => {
    this.selectedOptionsMap = {};
    this.selectedOptions = [];
    this.onChange(this.selectedOptions);
  }

  public resetSearchControl = () => {
    this.searchControl.reset();
  }

  // Value Accessor
  public writeValue(options: string[]): void {
    this.selectedOptions = options || [];
    if (!options || !options?.length) {
      this.selectedOptionsMap = {};
    }
    this.cdr.markForCheck();
  }

  registerOnChange(fn: (data: string[]) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
