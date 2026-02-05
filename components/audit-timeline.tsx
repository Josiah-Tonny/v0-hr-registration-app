import { TimelineEvent } from '@/types';
import { format } from 'date-fns';

interface AuditTimelineProps {
  events: TimelineEvent[];
}

const eventTypeIcons: Record<string, string> = {
  status_change: '🔄',
  document_upload: '📄',
  profile_update: '✏️',
  note_added: '💬',
  status_check: '👁️',
};

export function AuditTimeline({ events }: AuditTimelineProps) {
  const sortedEvents = [...events].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  return (
    <div className="space-y-6">
      {sortedEvents.map((event, index) => (
        <div key={event.id} className="flex gap-4">
          {/* Timeline line and dot */}
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-lg">
              {eventTypeIcons[event.eventType] || '📌'}
            </div>
            {index < sortedEvents.length - 1 && <div className="w-0.5 h-12 bg-gray-200 mt-2" />}
          </div>

          {/* Content */}
          <div className="flex-1 pb-4">
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex items-start justify-between gap-2 mb-2">
                <h4 className="font-semibold text-gray-900">{event.title}</h4>
                <span className="text-xs text-gray-500 whitespace-nowrap">
                  {format(new Date(event.timestamp), 'MMM d, yyyy HH:mm')}
                </span>
              </div>
              {event.description && <p className="text-sm text-gray-600 mb-2">{event.description}</p>}
              <p className="text-xs text-gray-500">By {event.performedBy}</p>
            </div>
          </div>
        </div>
      ))}

      {sortedEvents.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>No timeline events yet</p>
        </div>
      )}
    </div>
  );
}
