"use client";
import React, { useState, useEffect } from "react";
import Timeline, {
  TimelineGroupBase,
  TimelineItemBase,
} from "react-calendar-timeline";
import "react-calendar-timeline/lib/Timeline.css";

// Define types for groups and items
interface Group extends TimelineGroupBase {
  id: number;
  title: string;
}

interface Item extends TimelineItemBase<number> {
  id: number;
  group: number;
  title: string;
  start_time: number;
  end_time: number;
}

const initialGroups: Group[] = [
  { id: 1, title: "Group 1" },
  { id: 2, title: "Group 2" },
];

const Home: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [groups] = useState<Group[]>(initialGroups);

  useEffect(() => {
    const staticItems: Item[] = [
      {
        id: 1,
        group: 1,
        title: "Item 1",
        start_time: new Date("2024-11-05T18:00:00Z").getTime(),
        end_time: new Date("2024-11-05T19:40:56Z").getTime(),
      },
      {
        id: 2,
        group: 2,
        title: "Item 2",
        start_time: new Date("2024-11-05T16:30:00Z").getTime(),
        end_time: new Date("2024-11-05T17:30:00Z").getTime(),
      },
      {
        id: 3,
        group: 1,
        title: "Item 3",
        start_time: new Date("2024-11-05T20:00:00Z").getTime(),
        end_time: new Date("2024-11-05T21:00:00Z").getTime(),
      },
    ];

    setItems(staticItems);
  }, []);

  // Handle item movement
  const handleItemMove = (itemId: number, dragTime: number, newGroup: number) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId
          ? {
              ...item,
              start_time: dragTime,
              end_time: dragTime + (item.end_time - item.start_time),
              group: newGroup,
            }
          : item
      )
    );

    console.log(`Moved Item ID: ${itemId} to Group: ${newGroup} at Start Time: ${new Date(dragTime).toISOString()}`);
  };

  // Handle item resizing
  const handleItemResize = (itemId: number, time: number, edge: "left" | "right") => {
    setItems(prevItems =>
      prevItems.map(item => {
        if (item.id === itemId) {
          const updatedItem = edge === "left"
            ? { ...item, start_time: time }
            : { ...item, end_time: time };

          console.log(
            `Resized Item ID: ${itemId} ${edge === "left" ? "Start Time" : "End Time"}: ${new Date(updatedItem.start_time).toISOString()} - ${new Date(updatedItem.end_time).toISOString()}`
          );

          return updatedItem;
        }
        return item;
      })
    );
  };

  return (
    <div>
      <h1 className="text-green-600">Timeline</h1>
      <Timeline
        groups={groups}
        items={items}
        defaultTimeStart={new Date("2024-11-05T06:00:00Z")}
        defaultTimeEnd={new Date("2024-11-05T18:00:00Z")}
        itemHeightRatio={0.95}
        stackItems
        itemTouchSendsClick={false}
        canMove={true}
        canResize={"both"}
        sidebarContent={<div>Above The Left</div>}
        // Add callbacks for moving and resizing items
        onItemMove={handleItemMove}
        onItemResize={handleItemResize}
      />
    </div>
  );
};

export default Home;
