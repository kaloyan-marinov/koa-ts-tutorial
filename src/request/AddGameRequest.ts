export class AddGameRequest {
  name!: string;
  /*
  since we have not added the validation decorators yet,
  the exclamation mark is going to tell TypeScript "I know what I'm doing this -
  this won't be null"
  */
}
