import {
    type GlacialLake,
    type SensorData,
    type PreventiveMeasure,
    type InsertGlacialLake,
    type InsertSensorData,
    type InsertPreventiveMeasure,
  } from "@shared/schema";
  
  export interface IStorage {
    getAllLakes(): Promise<GlacialLake[]>;
    getLake(id: number): Promise<GlacialLake | undefined>;
    getSensorData(lakeId: number): Promise<SensorData[]>;
    getPreventiveMeasures(lakeId: number): Promise<PreventiveMeasure[]>;
    createLake(lake: InsertGlacialLake): Promise<GlacialLake>;
    createSensorData(data: InsertSensorData): Promise<SensorData>;
    createPreventiveMeasure(measure: InsertPreventiveMeasure): Promise<PreventiveMeasure>;
  }
  
  export class MemStorage implements IStorage {
    private lakes: Map<number, GlacialLake>;
    private sensorData: Map<number, SensorData[]>;
    private measures: Map<number, PreventiveMeasure[]>;
    private currentIds: { lakes: number; sensors: number; measures: number };
  
    constructor() {
      this.lakes = new Map();
      this.sensorData = new Map();
      this.measures = new Map();
      this.currentIds = { lakes: 1, sensors: 1, measures: 1 };
  
      // Add mock data
      const mockLake: InsertGlacialLake = {
        name: "Tsho Rolpa",
        latitude: 27.8619,
        longitude: 86.4769,
        elevation: 4580,
        volume: 85000000,
        riskLevel: "high",
        daysToFlood: 45,
        lastUpdated: new Date(),
      };
      this.createLake(mockLake);
    }
  
    async getAllLakes(): Promise<GlacialLake[]> {
      return Array.from(this.lakes.values());
    }
  
    async getLake(id: number): Promise<GlacialLake | undefined> {
      return this.lakes.get(id);
    }
  
    async getSensorData(lakeId: number): Promise<SensorData[]> {
      return this.sensorData.get(lakeId) || [];
    }
  
    async getPreventiveMeasures(lakeId: number): Promise<PreventiveMeasure[]> {
      return this.measures.get(lakeId) || [];
    }
  
    async createLake(insertLake: InsertGlacialLake): Promise<GlacialLake> {
      const id = this.currentIds.lakes++;
      const lake = { ...insertLake, id };
      this.lakes.set(id, lake);
      return lake;
    }
  
    async createSensorData(insertData: InsertSensorData): Promise<SensorData> {
      const id = this.currentIds.sensors++;
      const data = { ...insertData, id };
      const existing = this.sensorData.get(data.lakeId) || [];
      this.sensorData.set(data.lakeId, [...existing, data]);
      return data;
    }
  
    async createPreventiveMeasure(
      insertMeasure: InsertPreventiveMeasure,
    ): Promise<PreventiveMeasure> {
      const id = this.currentIds.measures++;
      const measure = { ...insertMeasure, id };
      const existing = this.measures.get(measure.lakeId) || [];
      this.measures.set(measure.lakeId, [...existing, measure]);
      return measure;
    }
  }
  
  export const storage = new MemStorage();
  