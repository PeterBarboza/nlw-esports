import {
  IsNotEmpty,
  IsString,
  IsBoolean,
  IsArray,
  IsInt,
  IsUUID,
} from "class-validator"

export class CreateAdDTO {
  @IsNotEmpty()
  @IsString()
  name!: string

  @IsNotEmpty()
  @IsString()
  hourStart!: string

  @IsNotEmpty()
  @IsString()
  hourEnd!: string

  @IsNotEmpty()
  @IsString()
  weekDays!: string

  @IsNotEmpty()
  @IsInt()
  yearsPlaying!: number

  @IsNotEmpty()
  @IsBoolean()
  useVoiceChannel!: boolean

  @IsNotEmpty()
  @IsString()
  discord!: string
}
