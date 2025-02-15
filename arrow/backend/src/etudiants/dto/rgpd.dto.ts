import { IsBoolean, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class RgpdDto {
  @IsBoolean()
  consentement: boolean;

  @IsDate()
  @Type(() => Date)
  dateConsentement: Date;

  @IsBoolean()
  droitsAcces: boolean;
}
