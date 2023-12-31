"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";

interface SwitherProps {
  query: string;
  label: string;
}

const Switcher = ({ query, label }: SwitherProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const paramFilter = searchParams.get(query);

  const handleUpdateParams = (checked: boolean) => {
    let newUrl;

    if (!checked) {
      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keys: [query],
      });
    } else {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: query,
        // TODO?
        value: checked.toString(),
      });
    }

    router.push(newUrl, { scroll: false });
  };

  return (
    <>
      <Switch
        id={`${query}-switcher`}
        className="ml-4 mr-2"
        checked={paramFilter === "true"}
        onCheckedChange={handleUpdateParams}
      />
      <Label htmlFor={`${query}-switcher`} className="text-light-500">
        {label}
      </Label>
    </>
  );
};

export default Switcher;
