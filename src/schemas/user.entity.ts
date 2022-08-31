import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { hash } from 'bcrypt'
import { AppRoles } from 'src/app.roles'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number
  @Column({ nullable: true })
  email: string
  @Column({ type: 'varchar', nullable: true, length: 128, select: false })
  password: string
  @Column({ default: AppRoles.AUTHOR })
  roles: string
  @Column({ default: 'pending verify mail' })
  status: string
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date
  @DeleteDateColumn({ type: 'timestamp', nullable: true, select: false })
  deletedAt: Date

  @Column({ default: 'local' })
  type: string

  /// for line
  @Column({ nullable: true })
  displayName: string
  @Column({ type: 'text', nullable: true })
  pictureUrl: string
  @Column({ nullable: true })
  userId: string
  @Column({ type: 'text', nullable: true })
  idToken: string

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (!this.password) {
      return
    }
    this.password = await hash(this.password, 10)
  }
}
