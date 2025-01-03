/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { DataTable } from "@/components/datatable/content";
import { DataTableColumnHeader } from "@/components/datatable/header";
import { CirclePlus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface Task {
  id: string;
  title: string;
  status: string;
  priority: string;
}

const Employee = () => {
  const router = useRouter();
  const tasks: Task[] = [
    { id: "TASK-8782", title: "You can't compress the program...", status: "In Progress", priority: "Medium" },
    { id: "TASK-7878", title: "Try to calculate the EXE feed...", status: "Backlog", priority: "Medium" },
    { id: "TASK-7839", title: "We need to bypass the neural TCP card!", status: "Todo", priority: "High" },
    { id: "TASK-5562", title: "The SAS interface is down...", status: "Backlog", priority: "Medium" },
    { id: "TASK-8686", title: "I'll parse the wireless SSL protocol...", status: "Canceled", priority: "Medium" },
    { id: "TASK-1280", title: "Use the digital TLS panel...", status: "Done", priority: "High" },
    { id: "TASK-7262", title: "The UTF8 application is down...", status: "Done", priority: "High" },
    { id: "TASK-7262", title: "The UTF8 application is down...", status: "Done", priority: "High" },
    { id: "TASK-7262", title: "The UTF8 application is down...", status: "Done", priority: "High" },
    { id: "TASK-7262", title: "The UTF8 application is down...", status: "Done", priority: "High" },
    { id: "TASK-7262", title: "The UTF8 application is down...", status: "Done", priority: "High" },
    { id: "TASK-7262", title: "The UTF8 application is down...", status: "Done", priority: "High" },
    { id: "TASK-7262", title: "The UTF8 application is down...", status: "Done", priority: "High" },
    { id: "TASK-7262", title: "The UTF8 application is down...", status: "Done", priority: "High" },
    { id: "TASK-7262", title: "The UTF8 application is down...", status: "Done", priority: "High" },
    { id: "TASK-7262", title: "The UTF8 application is down...", status: "Done", priority: "High" },
    { id: "TASK-7262", title: "The UTF8 application is down...", status: "Done", priority: "High" },
    { id: "TASK-7262", title: "The UTF8 application is down...", status: "Done", priority: "High" },
    { id: "TASK-7262", title: "The UTF8 application is down...", status: "Done", priority: "High" },
    { id: "TASK-7262", title: "The UTF8 application is down...", status: "Done", priority: "High" },
    { id: "TASK-7262", title: "The UTF8 application is down...", status: "Done", priority: "High" },
    { id: "TASK-7262", title: "The UTF8 application is down...", status: "Done", priority: "High" },
    { id: "TASK-7262", title: "The UTF8 application is down...", status: "Done", priority: "High" },
    { id: "TASK-7262", title: "The UTF8 application is down...", status: "Done", priority: "High" },
    { id: "TASK-7262", title: "The UTF8 application is down...", status: "Done", priority: "High" },
  ];

  const columns = [
    {
      accessorKey: "id",
      header: ({ column }: { column: any }) => (
        <DataTableColumnHeader column={column} title="Task" />
      ),
    },
    {
      accessorKey: 'title',
      header: ({ column }: { column: any }) => (
        <DataTableColumnHeader column={column} title="Title" />
      ),
    },
    {
      accessorKey: 'status',
      header: ({ column }: { column: any }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
    },
    {
      accessorKey: 'priority',
      header: ({ column }: { column: any }) => (
        <DataTableColumnHeader column={column} title="Priority" />
      ),
    },
  ];

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Tasks</h1>
      <div className="flex gap-2">
        <Button variant="ghost" className="text-foreground" title="Add Employee" onClick={() => router.push("/backoffice/employee/create")}><CirclePlus className="w-48 h-48" /></Button>
      </div>
      <DataTable columns={columns} data={tasks}  />
    </div>
  );
}

export default Employee;
  