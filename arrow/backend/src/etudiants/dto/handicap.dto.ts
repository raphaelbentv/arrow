import { IsBoolean, IsString, IsArray } from 'class-validator';

export class HandicapDto {
  @IsBoolean()
  situation: boolean;

  @IsString()
  besoinsSpecifiques: string;

  @IsArray()
  @IsString({ each: true })
  amenagements: string[];

  @IsString()
  referentHandicap: string;
}
