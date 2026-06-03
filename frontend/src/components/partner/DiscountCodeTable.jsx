import { Copy, Check } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import Badge from "../common/Badge";
import Button from "../common/Button";
import { formatDate } from "../../utils/formatDate";

const CopyButton = ({ code }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      toast.success("Code copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy code");
    }
  };

  return (
    <Button variant="ghost" size="sm" onClick={handleCopy}>
      {copied ? (
        <Check className="h-4 w-4 text-emerald-600" />
      ) : (
        <Copy className="h-4 w-4" />
      )}
      {copied ? "Copied" : "Copy"}
    </Button>
  );
};

const DiscountCodeTable = ({ codes = [] }) => {
  if (!codes.length) {
    return (
      <p className="py-8 text-center text-sm text-slate-500">
        No discount codes assigned yet.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[600px] text-left text-sm">
        <thead>
          <tr className="border-b border-slate-200 text-xs uppercase text-slate-500">
            <th className="pb-3 pr-4 font-semibold">Code</th>
            <th className="pb-3 pr-4 font-semibold">Status</th>
            <th className="pb-3 pr-4 font-semibold">Usage Count</th>
            <th className="pb-3 pr-4 font-semibold">Expiry Date</th>
            <th className="pb-3 font-semibold">Action</th>
          </tr>
        </thead>
        <tbody>
          {codes.map((code) => (
            <tr key={code.id} className="border-b border-slate-100">
              <td className="py-3 pr-4 font-mono font-semibold text-primary">
                {code.code}
              </td>
              <td className="py-3 pr-4">
                <Badge variant={code.active ? "active" : "inactive"}>
                  {code.active ? "Active" : "Inactive"}
                </Badge>
              </td>
              <td className="py-3 pr-4">{code.usageCount}</td>
              <td className="py-3 pr-4">{formatDate(code.expiryDate)}</td>
              <td className="py-3">
                <CopyButton code={code.code} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DiscountCodeTable;
