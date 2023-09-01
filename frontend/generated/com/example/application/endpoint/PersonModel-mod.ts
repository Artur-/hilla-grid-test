import {
  _getPropertyModel as _getPropertyModel_1,
  NumberModel as NumberModel_1,
  ObjectModel as ObjectModel_1,
  StringModel as StringModel_1,
} from "@hilla/form";
import type Person_1 from "./Person.js";
class PersonModel<T extends Person_1 = Person_1> extends ObjectModel_1<T> {
  declare static createEmptyValue: () => Person_1;
  get email(): StringModel_1 {
    return this[_getPropertyModel_1]("email", StringModel_1, [
      false,
    ]) as StringModel_1;
  }
  get name(): StringModel_1 {
    return this[_getPropertyModel_1]("name", StringModel_1, [
      false,
    ]) as StringModel_1;
  }
  get dateOfBirth(): StringModel_1 {
    return this[_getPropertyModel_1]("dateOfBirth", StringModel_1, [
      false,
    ]) as StringModel_1;
  }
  get dateOfBirthOptions(): any {
    return { javaType: "LocalDate" };
  }
  get salary(): NumberModel_1 {
    return this[_getPropertyModel_1]("salary", NumberModel_1, [
      false,
    ]) as NumberModel_1;
  }
  get salaryOptions(): any {
    return { customFormatter: "intToEuros", javaType: "int" };
  }
  get taxesPaid(): NumberModel_1 {
    return this[_getPropertyModel_1]("taxesPaid", NumberModel_1, [
      false,
    ]) as NumberModel_1;
  }
  get taxesPaidOptions(): any {
    return { javaType: "BigDecimal" };
  }
}
export default PersonModel;
