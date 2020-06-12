import { Repository, EntityRepository } from 'typeorm';
import { Mail } from './mail.entity';

@EntityRepository(Mail)
export class MailRepository extends Repository<Mail> {}
