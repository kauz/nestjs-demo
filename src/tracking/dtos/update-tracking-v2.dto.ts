import { IsArray, IsDateString, IsDefined, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class TrackingUpdate {
  @IsString()
  @IsDefined()
  tracking_number: string;

  @IsDateString()
  date_time: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  status: string;
}

export class UpdateTrackingV2Dto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TrackingUpdate)
  items: TrackingUpdate[];
}
