import { ChangeDetectionStrategy, Component, forwardRef, Input, OnInit, ViewChild } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { debounceTime, map, Observable, startWith } from 'rxjs';
import { MatAutocomplete, MatAutocompleteTrigger } from '@angular/material/autocomplete';

@Component({
  selector: 'app-skills-select',
  templateUrl: './skills-select.component.html',
  styleUrls: ['./skills-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SkillsSelectComponent),
    multi: true,
  }],
})
export class SkillsSelectComponent implements OnInit, ControlValueAccessor {
  public filteredOptions$!: Observable<string[]>;

  public addedSkills: string[] = [];

  public skillControl = new FormControl('', [this.customAutoCompleteValidator()]);

  public originalOptions: string[] = [];

  @Input() set options(options: string[] | null) {
    if (options) {
      this.originalOptions = options;
    }
  };

  @ViewChild('autoComplete', { static: true }) autocompleteRef!: MatAutocomplete;

  @ViewChild(MatAutocompleteTrigger) autocompleteTrigger!: MatAutocompleteTrigger;

  // Value Accessor
  private onChange!: (data: string[]) => void;

  private onTouched!: () => void;

  ngOnInit() {
    this.filteredOptions$ = this.skillControl.valueChanges.pipe(
      startWith(''),
      debounceTime(200),
    ).pipe(
      map((value: string) => this.filterSkills(value))
    );
  }

  private filterSkills(value: string): string[] {
    let fullyEqual = false;
    const trimmed = value.trim();
    if (!trimmed) {
      if (!this.addedSkills.length) {
        return this.originalOptions;
      }
      return this.originalOptions.filter(option => !this.isAlreadyAdded(option.toLowerCase()));
    }

    const filterValue = trimmed.toLowerCase();
    let filteredOptions = this.originalOptions.filter(option => {
      const lowerCased = option.toLowerCase();
      if (filterValue && filterValue === lowerCased) {
        fullyEqual = true;
      }
      return lowerCased.includes(filterValue) && !this.isAlreadyAdded(lowerCased);
    });

    if (
      filterValue
      && !fullyEqual
      && !this.isAlreadyAdded(filterValue)
    ) {
      filteredOptions = [trimmed, ...filteredOptions]
    }
    return filteredOptions;
  }

  private isAlreadyAdded(value: string) {
    return this.addedSkills.some((i) => i.toLowerCase() === value);
  }

  public onOptionsSelect(value: string): void {
    this.onSkillAdd(value);
  }

  public onAutocompleteEnter(value: string) {
    if (!value || this.isAlreadyAdded(value)) {
      return;
    }
    this.onSkillAdd(value);
  }

  public onSkillAdd(value: string) {
    this.addedSkills.push(value);
    this.skillControl.setValue('');
    this.autocompleteRef.closed.emit();
    this.onChange(this.addedSkills);
  }

  onAutocompleteFocus() {
    // workaround solution, because matAutocomplete opened EventEmitter doesn't work in case of empty filteredOptions$ array
    this.skillControl.setValue(this.skillControl.value);
  }

  public onSkillRemove(i: number): void {
    this.addedSkills.splice(i, 1);
    this.addedSkills = [...this.addedSkills];
    this.autocompleteTrigger.closePanel();
    this.onChange(this.addedSkills);
  }

  private customAutoCompleteValidator(): ValidatorFn  {
    return (): ValidationErrors | null => {
      return this.addedSkills.length ? null : { atLeastOne: true };
    }
  }

  // Value Accessor
  public writeValue(skills: string[]): void {
    if (skills?.length) {
      this.addedSkills = skills;
    }
  }

  registerOnChange(fn: (data: string[]) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
