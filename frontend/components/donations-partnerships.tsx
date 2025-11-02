"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { mockDonationService, type Partner } from "@/lib/mock-donation-service";
import { ExternalLink, Heart } from "lucide-react";
import { motion } from "framer-motion";

export function DonationsAndPartnerships() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
  const [donationAmount, setDonationAmount] = useState<number>(25);

  useEffect(() => {
    loadPartners();
  }, []);

  const loadPartners = async () => {
    try {
      setLoading(true);
      const fetchedPartners = await mockDonationService.getPartners();
      setPartners(fetchedPartners);
    } catch (error) {
      console.error("Failed to load partners:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDonate = (partner: Partner) => {
    setSelectedPartner(partner);
  };

  const processDonation = async () => {
    if (!selectedPartner) return;
    try {
      await mockDonationService.makeDonation(
        "user-1",
        donationAmount,
        selectedPartner.name
      );
      setSelectedPartner(null);
      setDonationAmount(25);
    } catch (error) {
      console.error("Failed to process donation:", error);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-8 text-green-700 font-medium">
        Loading partnerships...
      </div>
    );
  }

  return (
    <div className="space-y-10 px-4 md:px-16 mb-20">
      {/* 🌿 Impact Goals */}
      <Card className="bg-gradient-to-r from-green-50 to-green-100 border border-green-200 shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl md:text-3xl font-bold text-green-800">
            Your Impact Matters
          </CardTitle>
          <CardDescription className="text-green-700 mt-1">
            Every Pomodoro and saved minute contributes to real environmental
            change
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { value: 1000, label: "Pomodoros for Solar Panels" },
              { value: 5000, label: "Trees for Ocean Cleanup" },
              { value: 1500, label: "Energy Minutes for Water Wells" },
            ].map((item) => (
              <motion.div
                key={item.label}
                className="text-center p-4 bg-green-50 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                whileHover={{ scale: 1.03 }}
              >
                <div className="text-3xl md:text-4xl font-bold text-green-700 mb-2">
                  {item.value}
                </div>
                <p className="text-sm text-green-800">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 🌿 Partner Organizations */}
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-green-800 mb-6">
          Our Partner Organizations
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {partners.map((partner) => (
            <Card
              key={partner.id}
              className="bg-green-50 border-green-200 hover:shadow-lg transition-shadow overflow-hidden rounded-xl"
            >
              <CardContent className="p-6 space-y-4">
                {/* Partner Header */}
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-green-100 rounded-lg flex-shrink-0 flex items-center justify-center overflow-hidden">
                    <img
                      src={partner.logo || "/placeholder.svg"}
                      alt={partner.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-green-800 text-lg">
                      {partner.name}
                    </h3>
                    <a
                      href={partner.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-green-600 hover:text-green-700 flex items-center gap-1 mt-1"
                    >
                      Visit Site <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                {/* Partner Description */}
                <p className="text-sm text-green-700">{partner.description}</p>

                {/* Goals & Impact */}
                <div className="space-y-2 p-3 bg-green-100 rounded-lg">
                  <div>
                    <p className="text-xs font-semibold text-green-600 uppercase">
                      Our Goal
                    </p>
                    <p className="text-sm text-green-800">{partner.goal}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-green-600 uppercase">
                      Current Impact
                    </p>
                    <p className="text-sm text-green-700 font-semibold">
                      {partner.impact}
                    </p>
                  </div>
                </div>

                {/* Donate Button */}
                <Button
                  onClick={() => handleDonate(partner)}
                  className="w-full bg-green-600 hover:bg-green-700 text-white flex items-center justify-center gap-2 rounded-lg"
                >
                  <Heart className="w-4 h-4" />
                  Support This Cause
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* 🌿 Donation Modal */}
      {selectedPartner && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <Card className="bg-green-50 border-green-200 max-w-md w-full rounded-xl shadow-xl">
            <CardHeader>
              <CardTitle className="text-xl text-green-800 font-bold">
                Support {selectedPartner.name}
              </CardTitle>
              <CardDescription className="text-green-700">
                Choose an amount to donate
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Amount Presets */}
              <div>
                <label className="text-sm font-semibold text-green-800 mb-2 block">
                  Select Amount
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[10, 25, 50, 100, 250, 500].map((amount) => (
                    <Button
                      key={amount}
                      variant={
                        donationAmount === amount ? "default" : "outline"
                      }
                      onClick={() => setDonationAmount(amount)}
                      className="text-sm bg-green-50 border-green-400 hover:bg-green-100"
                    >
                      ${amount}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Custom Amount */}
              <div>
                <label className="text-sm font-semibold text-green-800 mb-2 block">
                  Or enter custom amount
                </label>
                <input
                  type="number"
                  min="1"
                  value={donationAmount}
                  onChange={(e) => setDonationAmount(Number(e.target.value))}
                  className="w-full px-4 py-2 bg-green-100 border border-green-300 rounded-lg text-green-800 focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>

              {/* Donation Info */}
              <div className="p-4 bg-green-100 border border-green-200 rounded-lg">
                <p className="text-sm text-green-700">
                  Your donation of{" "}
                  <span className="font-bold">${donationAmount}</span> will
                  directly support {selectedPartner.name}'s mission.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button
                  onClick={() => setSelectedPartner(null)}
                  variant="outline"
                  className="flex-1 border-green-400 text-green-700 hover:bg-green-100"
                >
                  Cancel
                </Button>
                <Button
                  onClick={processDonation}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                >
                  Donate ${donationAmount}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
