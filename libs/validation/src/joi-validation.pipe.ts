import { ObjectSchema } from 'joi';
import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema) {}

  transform(value: any, metadata: ArgumentMetadata)
  {
    const { error } = this.schema.validate(value);
    if (error) {
      throw new BadRequestException(error);
    }
    return value;
  }
}
