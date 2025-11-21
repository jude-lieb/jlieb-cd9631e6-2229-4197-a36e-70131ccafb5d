import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from './user.entity';

interface SeedUser {
  username: string;
  password: string;
  role: UserRole;
}

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async onModuleInit() {
    await this.ensureSeedUsers();
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.userRepo.findOne({ where: { username } });
  }

  async validateCredentials(
    username: string,
    password: string,
  ): Promise<Omit<User, 'password'> | null> {
    const user = await this.findByUsername(username);
    if (!user || user.password !== password) {
      return null;
    }

    // Strip password before returning.
    const { password: _, ...safeUser } = user;
    return safeUser;
  }

  private async ensureSeedUsers() {
    const seeds: SeedUser[] = [
      { username: 'admin', password: 'admin123', role: 'admin' },
      { username: 'user', password: 'user123', role: 'user' },
    ];

    for (const seed of seeds) {
      const exists = await this.userRepo.findOne({
        where: { username: seed.username },
      });
      if (!exists) {
        await this.userRepo.save(seed);
      }
    }
  }
}
