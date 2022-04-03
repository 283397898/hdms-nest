import { Injectable, NestMiddleware } from '@nestjs/common';
import { Decode } from 'src/tools/decode';

@Injectable()
export class DecodeMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const decode = new Decode();
    if (req.body.hasOwnProperty('encryptKey')) {
      console.time('decode');
      req.body = JSON.parse(<string>decode.decrypt(req.body));
      console.timeEnd('decode');
    }
    next();
  }
}
