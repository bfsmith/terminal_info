import * as os from 'os';
import * as si from 'systeminformation';

export interface IBatteryStats {
  hasBattery: boolean;
  level: number; // Percentage
  isCharging: boolean;
}

export interface ICPUStats {
  maxSpeed: number; // Ghz
  currentSpeed: number; // Ghz
  load: number;
  temp: number;
}

export interface IMemoryStats {
  total: number;
  used: number;
}

export interface ISystemInformation {
  battery: IBatteryStats;
  cpu: ICPUStats;
  memory: IMemoryStats;
}

export const getSystemInfo = async (): Promise<ISystemInformation> =>
  Promise.all([getBatteryStats(), getCpuStats(), getMemoryStats()])
    .then(results => {
      const [battery, cpu, memory] = results;
      return { battery, cpu, memory };
    });

const getBatteryStats = (): Promise<IBatteryStats> =>
  si.battery()
    .then(battery => ({
      level: battery.percent,
      isCharging: battery.ischarging,
      hasBattery: battery.hasbattery,
    } as IBatteryStats));

const getCpuStats = async (): Promise<ICPUStats> => ({
  maxSpeed: Number(await si.cpu().then(cpu => cpu.speed)),
  currentSpeed: Number(await si.cpuCurrentspeed().then(cpuS => cpuS.avg)),
  load: Number(await si.currentLoad().then(load => load.currentload)),
  temp: Number(await si.cpuTemperature().then(cpuS => cpuS.max)),
});

const getMemoryStats = async (): Promise<IMemoryStats> =>
  si.mem().then(mem => ({
    total: mem.total,
    used: mem.used,
  }));

const procSpeedGhz = (cpuInfo: any): number =>
  cpuInfo.speed / 1000;
