import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AdmissionsModule } from './admissions/admissions.module';
import { AttendanceModule } from './attendance/attendance.module';
import { ExaminationsModule } from './examinations/examinations.module';
import { FeesModule } from './fees/fees.module';
import { NotificationsModule } from './notifications/notifications.module';
import { PrismaModule } from './prisma/prisma.module';
import { PayrollModule } from './payroll/payroll.module';
import { LeaveModule } from './leave/leave.module';
import { LibraryModule } from './library/library.module';
import { TransportModule } from './transport/transport.module';
import { HostelModule } from './hostel/hostel.module';

@Module({
  imports: [AuthModule, AdmissionsModule, AttendanceModule, ExaminationsModule, FeesModule, NotificationsModule, PrismaModule, PayrollModule, LeaveModule, LibraryModule, TransportModule, HostelModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
