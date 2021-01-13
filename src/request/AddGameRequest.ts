// /*
// We are getting these console warnings that say:
// "
// Hey, we tried to run the validator, and that was OK.
// But: we don't actually have any metadata set on our class,
// so how on Earth are you expecting me to be able to validate this?
// "

// The reason why two of our tests were failing was because we expected after validation
// to get back at least 1 validation failure.
// */
// import { IsString, Length } from "class-validator";

// export class AddGameRequest {
//   @IsString()
//   @Length(1, 20)
//   name!: string;
//   /*
//   since we have not added the validation decorators yet,
//   the exclamation mark is going to tell TypeScript "I know what I'm doing this -
//   this won't be null"
//   */
// }

import { GameRequest } from "./GameRequest";

export class AddGameRequest extends GameRequest {}
