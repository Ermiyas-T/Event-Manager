import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './event.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { EventResponseDto } from './dto/event-response.dto';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
  ) {}

  async findAll(): Promise<EventResponseDto[]> {
    const events = await this.eventRepository.find();
    return events.map((event) => this.toResponse(event));
  }

  async findOne(id: number): Promise<EventResponseDto> {
    const event = await this.eventRepository.findOne({ where: { id } });
    if (!event) {
      throw new NotFoundException('Event not found');
    }
    return this.toResponse(event);
  }

  async create(createEventDto: CreateEventDto): Promise<EventResponseDto> {
    const newEvent = this.eventRepository.create(createEventDto);
    const savedEvent = await this.eventRepository.save(newEvent);
    return this.toResponse(savedEvent);
  }

  async update(
    id: number,
    updateEventDto: UpdateEventDto,
  ): Promise<EventResponseDto> {
    const event = await this.eventRepository.preload({ id, ...updateEventDto });

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    const updatedEvent = await this.eventRepository.save(event);
    return this.toResponse(updatedEvent);
  }

  async remove(id: number): Promise<void> {
    const result = await this.eventRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Event not found');
    }
  }

  private toResponse(event: Event): EventResponseDto {
    return {
      id: event.id,
      title: event.title,
      description: event.description,
      date: event.date,
      location: event.location,
      price: event.price,
    };
  }
}
